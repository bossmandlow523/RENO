interface TeamMember {
  name: string;
  title: string;
  titleShort: string;
  bio: string;
  image: string;
  grayscale?: boolean;
}

const executives: TeamMember[] = [
  {
    name: "TED SPARLING JR",
    title: "DIRECTOR / PRESIDENT / CHIEF EXECUTIVE OFFICER",
    titleShort: "Director / President / CEO",
    bio: "",
    image: "/team/ted.jpg",
  },
  {
    name: "RANDALL MORITZ",
    title: "DIRECTOR / CHIEF OPERATIONS OFFICER",
    titleShort: "Director / Chief Operations Officer",
    bio: "",
    image: "/team/randall-moritz.png",
  },
  {
    name: "JAMES LAMANNA, CPA",
    title: "DIRECTOR / CHIEF FINANCIAL OFFICER",
    titleShort: "Director / CFO",
    bio: "",
    image: "/team/james-lamanna.jpg",
  },
  {
    name: "LORI TOOMEY",
    title: "DIRECTOR / EXECUTIVE COMMITTEE",
    titleShort: "Director / Executive Committee",
    bio: "",
    image: "/team/lori-toomey.jpg",
  },
  {
    name: "JAMES TOOMEY",
    title: "DIRECTOR / SECRETARY",
    titleShort: "Director / Secretary",
    bio: "",
    image: "/team/james-toomey.jpg",
  },
];

const boardMembers: TeamMember[] = [
  {
    name: "JAMES LINDSAY",
    title: "BOARD MEMBER",
    titleShort: "Board Member",
    bio: "",
    image: "/team/james-lindsay.jpg",
  },
  {
    name: "KERI MORITZ",
    title: "BOARD MEMBER",
    titleShort: "Board Member",
    bio: "",
    image: "/team/keri-moritz.jpg",
  },
  {
    name: "LISA MATHEWS",
    title: "BOARD MEMBER",
    titleShort: "Board Member",
    bio: "",
    image: "",
  },
];

function TeamCard({ member }: { member: TeamMember }) {
  return (
    <div className="aspect-square metallic-border rounded-xl relative overflow-hidden">
      {member.image ? (
        <div
          className={`w-full h-full bg-center bg-cover ${member.grayscale ? "grayscale" : ""}`}
          style={{ backgroundImage: `url("${member.image}")` }}
        />
      ) : (
        <div className="w-full h-full bg-surface-800 flex items-center justify-center">
          <span className="material-symbols-outlined text-6xl text-surface-600">person</span>
        </div>
      )}
      <div className="absolute bottom-0 left-0 p-6 w-full bg-gradient-to-t from-black/90 via-black/60 to-transparent pt-16">
        <h3 className="font-display text-xl mb-1 font-black uppercase text-white">
          {member.name}
        </h3>
        <p className="font-body text-xs tracking-widest text-accent-300 font-extrabold uppercase">
          {member.titleShort}
        </p>
      </div>
    </div>
  );
}

function SectionHeader({
  title,
  count,
}: {
  title: string;
  count: number;
}) {
  return (
    <div className="flex items-baseline justify-between mb-20">
      <h2
        className="text-4xl lg:text-5xl uppercase tracking-tighter text-white font-display"
      >
        {title}
      </h2>
      <div className="hidden md:block flex-1 mx-12 h-px bg-white/10" />
      <div className="-skew-x-12 bg-white/5 px-6 py-2">
        <div className="skew-x-12 font-body text-[10px] tracking-widest text-white">
          {String(count).padStart(2, "0")} UNITS
        </div>
      </div>
    </div>
  );
}

export default function OurTeamPage() {
  return (
    <div className="bg-[#121212] text-white min-h-screen">
      {/* Brand Header */}
      <section className="pt-32 lg:pt-40 pb-24 flex flex-col items-center justify-center text-center px-6">
        <p className="font-body font-bold tracking-[0.4em] text-accent-400 uppercase text-[10px] mb-6">
          Meet the Team
        </p>
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl uppercase metal-shimmer leading-none">
          Kingfish Holdings
        </h1>
        <p className="font-heading font-medium text-sm md:text-base tracking-[0.35em] uppercase text-accent-300 mt-3">
          A Delaware Company
        </p>
        <div className="w-16 h-px bg-surface-600 mt-10" />
      </section>

      {/* Executive Committee */}
      <section className="max-w-[1470px] mx-auto px-6 md:px-10 py-24 border-t border-white/5" style={{ backgroundImage: "linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "40px 100%" }}>
        <SectionHeader title="Executive Committee" count={executives.length} />
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {executives.map((member) => (
            <TeamCard key={member.name} member={member} />
          ))}
        </div>
      </section>

      {/* Board of Directors */}
      <section className="max-w-[1470px] mx-auto px-6 md:px-10 py-24" style={{ backgroundImage: "linear-gradient(0deg, rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "100% 40px" }}>
        <SectionHeader title="Board of Directors" count={boardMembers.length} />
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {boardMembers.map((member) => (
            <TeamCard key={member.name} member={member} />
          ))}
        </div>
      </section>
    </div>
  );
}
