import React from 'react';
import Footer from '../components/Footer';
import Headers from '../components/Headers';

const YallaRefundPolicy = () => {
  return (
    <div className="bg-gray-100 min-h-screen">

      <Headers/>

      <header className=" bg-[#FFD700] mt-2 py-8 rounded-[700px_0px_700px_0px]" >
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold text-white">Yalla Refund Policy</h1>
        </div>
      </header>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          {/* Refund Process */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Refund Process</h2>
            <p className="mb-4">
              We want you to be completely satisfied with your purchase from Yalla. If for any reason you are not satisfied, you may be eligible for a refund within 30 days of your purchase, provided the following conditions are met:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>The item must be unused and in the same condition that you received it.</li>
              <li>It must be in the original packaging.</li>
              <li>Proof of purchase (receipt or order number) is required for processing any refunds.</li>
            </ul>
          </section>

          {/* How to Request a Refund */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">How to Request a Refund</h2>
            <p className="mb-4">
              To request a refund, follow these steps:
            </p>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Contact our customer service at <a href="mailto:support@yalla.com" className="text-blue-500 underline">support@yalla.com</a> with your order details.</li>
              <li>Provide the reason for the refund request and attach any relevant images if necessary.</li>
              <li>Our team will review your request within 3-5 business days and notify you of the next steps.</li>
            </ol>
          </section>

          {/* Non-Refundable Items */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Non-Refundable Items</h2>
            <p className="mb-4">
              Certain items are non-refundable, including:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Gift cards</li>
              <li>Downloadable software products</li>
              <li>Perishable goods such as food, flowers, or plants</li>
            </ul>
          </section>

          {/* Refund Approval & Timeline */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Refund Approval & Timeline</h2>
            <p className="mb-4">
              Once your refund request is approved, we will process your refund and automatically apply the credit to your original method of payment within 7-10 business days. Please note that it may take some time for your bank or credit card company to process and post the refund.
            </p>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p>
              If you have any questions about our refund policy, please contact us at <a href="mailto:support@yalla.com" className="text-blue-500 underline">support@yalla.com</a>.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default YallaRefundPolicy;
