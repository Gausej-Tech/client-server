import React from "react";
import Card from "./Card";


const Section2 = () => {
  const cardData = [
    {
      image: "https://source.unsplash.com/800x600/?technology,ai",
      tag: "AI",
      title: "Revolutionary AI Solution for Small Businesses",
      description:
        "Our AI platform helps small businesses automate customer service with minimal setup.",
      profileImage: "https://randomuser.me/api/portraits/men/32.jpg",
      profileName: "John Doe",
      views: "1.2K",
      likes: "340",
    },
    {
      image: "https://source.unsplash.com/800x600/?startup,tech",
      tag: "Startup",
      title: "Empowering Startups with Smart Tools",
      description: "Tools built to scale your startup faster and smarter.",
      profileImage: "https://randomuser.me/api/portraits/women/44.jpg",
      profileName: "Jane Smith",
      views: "980",
      likes: "270",
    },
    {
      image: "https://source.unsplash.com/800x600/?data,analytics",
      tag: "Analytics",
      title: "Data-Driven Decisions Made Easy",
      description:
        "Use analytics to understand your audience and boost performance.",
      profileImage: "https://randomuser.me/api/portraits/men/45.jpg",
      profileName: "Mike Adams",
      views: "2.3K",
      likes: "580",
    },
  ];
  return (
    <div className="py-6">
      <div className="px-4 py-10 text-sm">
        <ul className="flex flex-wrap text-sm md:text-base justify-center gap-x-3 gap-y-4">
          <li>
            <button className="px-6 py-1.5 bg-[#458C58] text-white rounded-3xl cursor-pointer">
              All
            </button>
          </li>
          <li>
            <button className="disable-button">Startup Pitch</button>
          </li>
          <li>
            <button className="disable-button">Product Demo</button>
          </li>
          <li>
            <button className="disable-button">Business Idea</button>
          </li>
          <li>
            <button className="disable-button">Promotional</button>
          </li>
          <li>
            <button className="disable-button">Podcast</button>
          </li>
          <li>
            <button className="disable-button">Other</button>
          </li>
        </ul>
      </div>

      <div className="grid grid-cols-1 p-10 text-sm md:text-base sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-32">
        {cardData.map((card, index) => (
          <Card
            key={index}
            image={card.image}
            tag={card.tag}
            title={card.title}
            description={card.description}
            profileImage={card.profileImage}
            profileName={card.profileName}
            views={card.views}
            likes={card.likes}
          />
        ))}
      </div>
    </div>
  );
};

export default Section2;
