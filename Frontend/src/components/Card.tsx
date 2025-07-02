import React, { createElement, useEffect } from "react";
import ShareIcon from "../icons/ShareIcon";

interface cardProps {
  title: string;
  link: string;
  type: "youtube" | "twitter";
}

const Card = ({ title, link, type }: cardProps) => {
  useEffect(() => {
    if (type === "twitter") {
      // Load Twitter widget script dynamically
      const script = document.createElement("script");
      script.setAttribute("src", "https://platform.twitter.com/widgets.js");
      script.setAttribute("async", "true");
      document.body.appendChild(script);

      // Clean up duplicate scripts if re-rendered
      return () => {
        document.body.removeChild(script);
      };
    }
  }, [type, link]);

  return (
    <div>
      <div className="p-4 border z-[1] rounded-md drop-shadow-lg bg-white outline-slate-200 max-w-72 min-h-48 min-w-72">
        <div className="flex justify-between">
          <div className="flex items-center text-md">
            <div className="text-gray-500 pr-2">
              <ShareIcon />
            </div>
            {title}
          </div>
          <div className="flex items-center ml-20">
            <div className="text-gray-500 pr-4">
              <a href={link} target="_blank">
                <ShareIcon />
              </a>
            </div>
            <div className="text-gray-500">
              <ShareIcon />
            </div>
          </div>
          <div></div>
        </div>
        <div className="pt-4">
          {type === "youtube" && (
            <iframe
              className="w-full"
              src={link.replace("watch", "embed").replace("?v=", "/")}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          )}
          {type === "twitter" && (
            <blockquote className="twitter-tweet">
              <a href={link.replace("x.com", "twitter.com")}></a>
            </blockquote>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
