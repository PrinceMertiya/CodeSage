import hero from "../../assets/hero-ui.png";

export default function HeroIllustration() {
  return (
    <div className="relative">

      <div className="absolute right-0 top-0 h-[700px] w-[700px] rounded-full bg-violet-600/20 blur-[170px] " />

      <img
        src={hero}
        alt="Hero"
        className="relative z-10 ml-0 mr-10 w-[800px] max-w-none"
      />

    </div>
  );
}