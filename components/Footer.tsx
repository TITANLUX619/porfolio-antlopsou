import { FaLocationArrow } from "react-icons/fa6";

import { socialMedia } from "@/data";
import { contactEmail } from "@/data/contact";
import MagicButton from "@/components/MagicButton";
import { getTranslations } from "next-intl/server";
import SocialMediaButton from "./SocialMediaButton";

const Footer = async () => {
  const t = await getTranslations();

  return (
    <footer className="w-full pt-20 pb-10" id="contact">
      {/* background grid */}
      <div className="w-full absolute left-0 -bottom-72 min-h-96">
        <img
          src="/assets/footer-grid.svg"
          alt="grid"
          className="w-full h-full dark:opacity-50 "
        />
      </div>

      <div className="flex flex-col items-center">
        <h1 className="heading lg:max-w-[45vw]">
          {t('footer.title1')}
          <span className="text-purple">
            {t('footer.title2')}
          </span>
          {t('footer.title3')}
        </h1>
        <p className="text-indigo-950/75 md:mt-10 my-5 text-center">
          {t('footer.subtitle')}
        </p>
        <a href={`mailto:${contactEmail}`}>
          <MagicButton
            title="Let's get in touch"
            icon={<FaLocationArrow />}
            position="right"
          />
        </a>
      </div>
      <div className="flex mt-16 md:flex-row flex-col justify-between items-center">
        <p className="md:text-base text-sm md:font-normal font-light">
          Copyright © 2024 Antonio López Soult
        </p>

        <div className="flex items-center md:gap-3 gap-6 sm:mt-4">
          {socialMedia.map((info) => (
            <SocialMediaButton key={info.id} info={info} />
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
