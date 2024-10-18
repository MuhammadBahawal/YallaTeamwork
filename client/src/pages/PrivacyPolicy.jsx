import React from 'react';
import Headers from '../components/Headers';
import Footer from '../components/Footer';

const PrivacyPolicy = () => {
    return (
        <div className=" max-w-9xl mx-auto">
        <Headers/>
            <header className=" bg-[#FFD700] p-5 mt-[30px] text-center rounded-[600px_0px_600px_0px]">
                <h1 className="text-4xl font-bold text-white">YALLA | Privacy Policy</h1>
            </header>

            <section className="p-5">
                <div className="mb-10 flex flex-col items-center justify-center">
                    <h2 className="text-2xl text-gray-800 mb-2 underline">Information We Collect</h2>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        We collect different types of personal information for various purposes to provide and improve our service. Name, email address, phone number, postal address, payment information, etc. Browser type, IP address, device type, and usage data.
                    </p>
                </div>

                <div className="mb-10 flex flex-col items-center justify-center">
                    <h2 className="text-2xl text-gray-800 mb-2 underline">How and Why We Use Your Information</h2>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        We use the personal information that we collect for various purposes, including to develop, improve, support, and provide the Service, allowing you to use its features while fulfilling and enforcing our Terms of Use...
                    </p>
                </div>

                <div className="mb-10 flex flex-col items-center justify-center">
                    <h2 className="text-2xl text-gray-800 mb-2 underline">How and Why We Share Your Information</h2>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        At Yalla, we care deeply about privacy. We may share your personal information with the following parties for the purpose of providing you with better services, personalized advertising, and marketing communications...
                    </p>
                </div>

                <div className="mb-10 flex flex-col items-center justify-center">
                    <h2 className="text-2xl text-gray-800 mb-2 underline">Your Rights and Choices</h2>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        You have certain rights and choices regarding your personal information, including the right to access, update, or delete your information...
                    </p>
                </div>

                <div className="mb-10 flex flex-col items-center justify-center">
                    <h2 className="text-2xl text-gray-800 mb-2 underline">How We Protect Your Information</h2>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        We adopt appropriate security measures to protect your personal information against unauthorized access, alteration, or disclosure. 
                    </p>
                    <ul className="list-disc list-inside text-lg text-gray-600 leading-relaxed">
                        <li>SSL encryption for secure data transmission.</li>
                        <li>Regular security assessments.</li>
                        <li>Restricted access to personal information to authorized personnel only.</li>
                    </ul>
                </div>

                <div className="mb-10 flex flex-col items-center justify-center">
                    <h2 className="text-2xl text-gray-800 mb-2 underline">Cookies</h2>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        Our website uses cookies to enhance your browsing experience. You can choose to set your browser to refuse cookies or to alert you when cookies are being sent. However, some parts of the website may not function properly if cookies are disabled...
                    </p>
                </div>

                <div className="mb-10 flex flex-col items-center justify-center">
                    <h2 className="text-2xl text-gray-800 mb-2 underline">Third-Party Links</h2>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        Our website may contain links to third-party websites. We are not responsible for the content or privacy practices of these websites. We encourage you to review their privacy policies before providing any personal information.
                    </p>
                </div>

                <div className="mb-10 flex flex-col items-center justify-center">
                    <h2 className="text-2xl text-gray-800 mb-2 underline">Changes to This Privacy Policy</h2>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        We may update this Privacy Policy from time to time. The updated version will be posted on this page with a new "Effective Date." We encourage you to review this page regularly to stay informed about how we protect your information....
                    </p>
                </div>
            </section>
            <Footer/>
        </div>
    );
}

export default PrivacyPolicy;
