param(
  [Parameter(Mandatory = $false)]
  [string]$JsonPath = "",

  [Parameter(Mandatory = $false)]
  [string]$OutDir = "",

  [Parameter(Mandatory = $false)]
  [switch]$Overwrite
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
if ([string]::IsNullOrWhiteSpace($JsonPath)) {
  $JsonPath = Join-Path $scriptDir "www.renovoresourcesolutions.com_what-we-buy.2026-02-10T00_20_33.535Z.json"
}
if ([string]::IsNullOrWhiteSpace($OutDir)) {
  $OutDir = Join-Path $scriptDir "whatwebuy"
}

function Sanitize-FileNamePart {
  param([Parameter(Mandatory = $true)][string]$Value)

  # Windows reserved characters: < > : " / \ | ? *
  $v = $Value -replace '[<>:"/\\|?*]', '-'
  $v = $v -replace '\s+', ' '
  $v = $v.Trim()
  # Avoid trailing dots/spaces (invalid on Windows)
  $v = $v.TrimEnd('.', ' ')
  if ([string]::IsNullOrWhiteSpace($v)) { return "untitled" }
  return $v
}

function Split-TitleAndExtension {
  param([Parameter(Mandatory = $true)][string]$Title, [Parameter(Mandatory = $true)][string]$Url)

  $t = $Title.Trim()
  $m = [regex]::Match($t, '^(?<base>.+?)\.(?<ext>[A-Za-z0-9]{2,5})$')
  if ($m.Success) {
    return @{
      Base = $m.Groups['base'].Value
      Ext  = "." + $m.Groups['ext'].Value.ToLowerInvariant()
      RawTitle = $t
    }
  }

  try {
    $u = [Uri]$Url
    $leaf = [Uri]::UnescapeDataString((Split-Path $u.AbsolutePath -Leaf))
    $m2 = [regex]::Match($leaf, '^(?<base>.+?)\.(?<ext>[A-Za-z0-9]{2,5})$')
    if ($m2.Success) {
      return @{
        Base = $t
        Ext  = "." + $m2.Groups['ext'].Value.ToLowerInvariant()
        RawTitle = $t
      }
    }
  } catch {
    # ignore
  }

  return @{
    Base = $t
    Ext  = ".jpg"
    RawTitle = $t
  }
}

function Get-UniquePath {
  param(
    [Parameter(Mandatory = $true)][string]$Directory,
    [Parameter(Mandatory = $true)][string]$BaseName,
    [Parameter(Mandatory = $true)][string]$Extension,
    [Parameter(Mandatory = $true)][hashtable]$SeenNames,
    [Parameter(Mandatory = $false)][switch]$Overwrite
  )

  $safeBase = Sanitize-FileNamePart -Value $BaseName
  $safeExt = $Extension
  if (-not $safeExt.StartsWith('.')) { $safeExt = "." + $safeExt }

  $n = 1
  while ($true) {
    $fileName = if ($n -eq 1) { "$safeBase$safeExt" } else { "$safeBase-$n$safeExt" }
    $fullPath = Join-Path $Directory $fileName

    if ($Overwrite) { return @{ FileName = $fileName; FullPath = $fullPath } }

    if (-not $SeenNames.ContainsKey($fileName) -and -not (Test-Path -LiteralPath $fullPath)) {
      return @{ FileName = $fileName; FullPath = $fullPath }
    }
    $n++
  }
}

function Extract-CommodityImagesFromMarkdown {
  param([Parameter(Mandatory = $true)][string]$Markdown)

  # Heuristic boundary: commodity grid starts at first "![Aluminum Cans.jpg]" and ends before first "![](" (empty alt)
  $startMatch = [regex]::Match($Markdown, '!\[Aluminum Cans\.jpg\]\(')
  if (-not $startMatch.Success) {
    throw "Could not find the start of the commodity image block (expected 'Aluminum Cans.jpg')."
  }

  $tail = $Markdown.Substring($startMatch.Index)
  $endMatch = [regex]::Match($tail, '!\[\]\(')
  $block = if ($endMatch.Success) { $tail.Substring(0, $endMatch.Index) } else { $tail }

  $items = @()
  $idx = 0
  while ($true) {
    $bang = $block.IndexOf('![', $idx)
    if ($bang -lt 0) { break }

    $titleStart = $bang + 2
    $titleEnd = $block.IndexOf(']', $titleStart)
    if ($titleEnd -lt 0) { break }

    if (($titleEnd + 1) -ge $block.Length -or $block[$titleEnd + 1] -ne '(') {
      $idx = $titleEnd + 1
      continue
    }

    $urlStart = $titleEnd + 2
    $depth = 1
    $j = $urlStart
    while ($j -lt $block.Length -and $depth -gt 0) {
      $ch = $block[$j]
      if ($ch -eq '(') { $depth++ }
      elseif ($ch -eq ')') { $depth-- }
      $j++
    }
    if ($depth -ne 0) { break }

    $urlEnd = $j - 1
    $title = $block.Substring($titleStart, $titleEnd - $titleStart).Trim()
    $url = $block.Substring($urlStart, $urlEnd - $urlStart).Trim()

    if (-not [string]::IsNullOrWhiteSpace($title) -and $url -match 'static\.wixstatic\.com\/media\/') {
      $items += [pscustomobject]@{ Title = $title; Url = $url }
    }

    $idx = $j
  }
  return $items
}

if (-not (Test-Path -LiteralPath $JsonPath)) {
  throw "JSON file not found: $JsonPath"
}

if (-not (Test-Path -LiteralPath $OutDir)) {
  New-Item -ItemType Directory -Path $OutDir | Out-Null
}

$json = Get-Content -LiteralPath $JsonPath -Raw | ConvertFrom-Json
if (-not $json.data -or -not $json.data.markdown) {
  throw "Unexpected JSON shape: missing data.markdown"
}

$markdown = [string]$json.data.markdown
$images = Extract-CommodityImagesFromMarkdown -Markdown $markdown

$acceptHeaders = @{
  # Prefer JPEG/PNG/GIF so Wix doesn't serve AVIF unexpectedly.
  "Accept" = "image/jpeg,image/png,image/gif,*/*;q=0.8"
}

$seen = @{}
$manifest = @()
$errorsPath = Join-Path $OutDir "errors.log"
if (Test-Path -LiteralPath $errorsPath) { Remove-Item -LiteralPath $errorsPath -Force }

$i = 0
foreach ($img in $images) {
  $i++
  $parts = Split-TitleAndExtension -Title $img.Title -Url $img.Url
  $uniq = Get-UniquePath -Directory $OutDir -BaseName $parts.Base -Extension $parts.Ext -SeenNames $seen -Overwrite:$Overwrite
  $seen[$uniq.FileName] = $true

  $tmpPath = $uniq.FullPath + ".tmp"
  if (Test-Path -LiteralPath $tmpPath) { Remove-Item -LiteralPath $tmpPath -Force }

  try {
    $resp = Invoke-WebRequest -Uri $img.Url -Headers $acceptHeaders -OutFile $tmpPath -MaximumRedirection 5
    Move-Item -LiteralPath $tmpPath -Destination $uniq.FullPath -Force

    $contentType = $null
    if ($resp -and ($resp.PSObject.Properties.Name -contains 'Headers')) {
      $contentType = $resp.Headers["Content-Type"]
    }

    $manifest += [pscustomobject]@{
      index      = $i
      title      = $img.Title
      url        = $img.Url
      savedFile  = $uniq.FileName
      savedPath  = $uniq.FullPath
      contentType = $contentType
    }
  } catch {
    $msg = $_.Exception.Message
    Add-Content -LiteralPath $errorsPath -Value ("[$i] " + $img.Title + " :: " + $img.Url + " :: " + $msg)
    if (Test-Path -LiteralPath $tmpPath) { Remove-Item -LiteralPath $tmpPath -Force -ErrorAction SilentlyContinue }
    $manifest += [pscustomobject]@{
      index      = $i
      title      = $img.Title
      url        = $img.Url
      savedFile  = $null
      savedPath  = $null
      error      = $msg
    }
  }
}

$manifestPath = Join-Path $OutDir "manifest.json"
$manifest | ConvertTo-Json -Depth 6 | Set-Content -LiteralPath $manifestPath -Encoding utf8

Write-Host ("Done. Extracted {0} images. Manifest: {1}" -f $images.Count, $manifestPath)
