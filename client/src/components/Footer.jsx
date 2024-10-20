import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchFooterData();
  }, []);

  const fetchFooterData = async () => {
    try {
      const response = await fetch('/data/data.json');
      const data = await response.json();
      populateFooter(data.products);
    } catch (error) {
      console.error('Error fetching footer data:', error);
    }
  };

  const populateFooter = (products) => {
    const uniqueCategories = [...new Set(products.map(item => item.category))].slice(0, 7);
    setCategories(uniqueCategories.map(category => {
      const subcategories = [...new Set(products
        .filter(item => item.category === category)
        .map(item => item.subcategory))];
      return { category, subcategories };
    }));
  };

  const footerLinks = {
    electronics: [
      'Mobiles', 'Tablets', 'Laptops', 'Home Appliances',
      'Camera, Photo & Video', 'Televisions', 'Headphones', 'Video Games',
    ],
    fashion: [
      'Women\'s Fashion', 'Men\'s Fashion', 'Girls\' Fashion', 'Boys\' Fashion',
      'Watches', 'Jewellery', 'Women\'s Handbags', 'Men\'s Eyewear',
    ],
    homeAndKitchen: [
      'Bath', 'Home Decor', 'Kitchen & Dining', 'Tools & Home Improvement',
      'Audio & Video', 'Furniture', 'Patio, Lawn & Garden', 'Pet Supplies',
    ],
    beauty: [
      'Fragrance', 'Make-up', 'Haircare', 'Skincare',
      'Bath & Body', 'Electronic Beauty Tools', 'Men\'s Grooming', 'Health Care Essentials',
    ],
    babyAndToys: [
      'Diapering', 'Baby Transport', 'Nursing & Feeding', 'Baby & Kids Fashion',
      'Baby & Toddler Toys', 'Tricycles & Scooters', 'Board Games & Cards', 'Outdoor Play',
    ],
    topBrands: [
      'Pampers', 'Apple', 'Nike', 'Samsung',
      'Tefal', 'L\'Oréal Paris', 'Skechers', 'BLACK+DECKER',
    ],
    discoverNow: [
      'noon Digest', 'Brand Glossary', 'Best Mobile Phones', 'Supermall',
      'Halloween Sale', '11.11 Singles Day Sale', 'Yellow Friday Sale', 'ENBD noon Credit Card',
    ],
  };

  return (
    <footer className="footer">
      <div className="footer-row1">
        <div className="content-1">
          <h1>We're Always Here To Help</h1>
          <p>Reach out to us through any of these support channels</p>
        </div>
        <div className="content-2">
          <div className="customer-help">
            <div className="ico">
              <i className="fas fa-info-circle"></i>
            </div>
            <Link to="/support-center" className='lin'>
              <p>Customer Happiness Center <span>help.noon.com</span></p>
            </Link>
          </div>

          <div className="email-support">
            <div className="ico"><i className="fas fa-envelope"></i></div>
            <Link to="/support-center" className='lin'>
              <p>EMAIL SUPPORT <span>care@noon.com</span></p>
            </Link>
          </div>
        </div>
      </div>

      <div className="gap-2 lg:w-8/12 sm:w-full">
        <div className="flex justify-center sm:justify-start sm:mt-6 w-full">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="flex flex-col">
              <h2 className="font-bold text-lg mb-2">{category.charAt(0).toUpperCase() + category.slice(1).replace(/([A-Z])/g, ' $1')}</h2>
              <ul className="flex flex-col gap-2 text-slate-600 text-sm">
                {links.map((link, index) => (
                  <li key={index}>
                    <Link to={`/${link.replace(/\s+/g, '-').toLowerCase()}`}>{link}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-left">
          <div className="footer-info">
            <p>© 2024 noon. All Rights Reserved</p>
          </div>
          <div className="footer-links">
            <ul>
              <Link to="/support-center"><li><i className="fas fa-info-circle"></i> Support Center</li></Link>
              <Link to="/safety-center"><li><i className="fas fa-shield-alt"></i> Safety Center</li></Link>
              <Link to="/privacy-policy"><li><i className="fas fa-user-secret"></i> Privacy Policy</li></Link>
              <Link to="/terms-of-use"><li><i className="fas fa-file-contract"></i> Terms of Use</li></Link>
            </ul>
          </div>
        </div>

        <div className="footer-bottom-right">
          <ul className="social-icons">
            <li><a href="#" className="facebook"><i className="fab fa-facebook-f"></i></a></li>
            <li><a href="#" className="twitter"><i className="fab fa-twitter"></i></a></li>
            <li><a href="#" className="instagram"><i className="fab fa-instagram"></i></a></li>
            <li><a href="#" className="linkedin"><i className="fab fa-linkedin-in"></i></a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
