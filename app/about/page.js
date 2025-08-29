import React from 'react';
import Image from 'next/image';

const cardHover =
    "transition-transform duration-300 ease-in-out transform hover:-translate-y-2 hover:scale-105 shadow-lg hover:shadow-2xl bg-white rounded-xl p-4";

const listItemHover =
    "transition-colors duration-200 hover:bg-yellow-50 hover:text-yellow-700 rounded-md cursor-pointer";

const headingGradient =
    "bg-gradient-to-r from-yellow-500 via-pink-500 to-purple-500 bg-clip-text text-transparent";

const About = () => {
    return (
        <div className="container mx-auto px-8 md:px-4 py-8">
            <h1 className={`text-4xl font-bold mb-6 ${headingGradient} transition-all duration-300`}>
                About Get Me a Chai
            </h1>
            <p className="text-lg mb-8 transition-colors duration-200 hover:text-yellow-700">
                Get Me a Chai is a crowdfunding platform designed for creators to fund their projects with the support of their fans. It&apos;s a space where your fans can directly contribute to your creative endeavors by buying you a chai. Unlock the potential of your fanbase and bring your projects to life.
            </p>

            <h2 className={`text-2xl font-semibold mb-4 ${headingGradient}`}>How It Works</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-black">
                <div className={`flex items-center mb-6 ${cardHover}`}>
                    <img
                        className="w-20 h-20 rounded-full mr-4 transition-transform duration-300 hover:scale-110"
                        src="/group.gif"
                        alt="Fans Want to Collaborate"
                    />
                    <div>
                        <h3 className="text-xl font-semibold mb-2">Fans Want to Collaborate</h3>
                        <p>Your fans are enthusiastic about collaborating with you on your projects.</p>
                    </div>
                </div>
                <div className={`flex items-center mb-6 ${cardHover}`}>
                    <img
                        className="w-20 h-20 rounded-full mr-4 transition-transform duration-300 hover:scale-110"
                        src="/coin.gif"
                        alt="Support Through Chai"
                    />
                    <div>
                        <h3 className="text-xl font-semibold mb-2">Support Through Chai</h3>
                        <p>Receive support from your fans in the form of chai purchases, directly contributing to your project funding.</p>
                    </div>
                </div>
            </div>

            {[
                {
                    title: "Benefits for Creators",
                    items: [
                        "Direct financial support from your fanbase",
                        "Engage with your fans on a more personal level",
                        "Access to a platform tailored for creative projects",
                    ],
                },
                {
                    title: "Benefits for Fans",
                    items: [
                        "Directly contribute to the success of your favorite creators",
                        "Exclusive rewards and perks for supporting creators",
                        "Be part of the creative process and connect with creators",
                    ],
                },
                {
                    title: "Benefits of Collaboration",
                    items: [
                        "Unlock new opportunities through collaboration with fellow creators",
                        "Expand your network and reach a wider audience",
                        "Combine skills and resources to create innovative projects",
                    ],
                },
                {
                    title: "Community Engagement",
                    items: [
                        "Interact with a supportive community of like-minded individuals",
                        "Receive valuable feedback and encouragement from peers",
                        "Participate in discussions and events centered around your interests",
                    ],
                },
                {
                    title: "Access to Resources",
                    items: [
                        "Gain access to resources such as tutorials, templates, and tools",
                        "Receive guidance and mentorship from experienced creators",
                        "Stay updated on industry trends and best practices",
                    ],
                },
                {
                    title: "Recognition and Exposure",
                    items: [
                        "Showcase your work to a global audience and gain recognition",
                        "Feature in promotional materials and campaigns",
                        "Build your portfolio and increase your credibility as a creator",
                    ],
                },
                {
                    title: "Supportive Community",
                    items: [
                        "Join a community that values creativity, diversity, and inclusivity",
                        "Find encouragement and inspiration from fellow members",
                        "Collaborate on projects and share resources for mutual growth",
                    ],
                },
            ].map((section, idx) => (
                <div key={section.title}>
                    <h2 className={`text-2xl font-semibold mb-4 ${headingGradient}`}>{section.title}</h2>
                    <ul className="list-disc pl-6 mb-6">
                        {section.items.map((item, i) => (
                            <li key={i} className={`mb-2 ${listItemHover}`}>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default About;

export const metadata = {
    title: "About - Get Me A Chai",
};