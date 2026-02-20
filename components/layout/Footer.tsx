import React from 'react';
import { IMAGE_BASE } from '@/lib/constants';

export function Footer() {
  return (
    <section className="footer-banner relative w-full">
      <div className="absolute inset-0 -z-10">
        <img src={`${IMAGE_BASE}/footer-banner.webp`} alt="footer banner" className="w-full h-full object-cover" />
      </div>

      <div className="max-w-330 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <div className="w-full md:w-1/2">
            <img src={`${IMAGE_BASE}/footer-logo.webp`} alt="logo1" />
          </div>
          <div className="w-full md:w-1/2">
            <div className="footer-follow-us text-right">
              <h4 className="text-white text-lg font-semibold">Follow Us</h4>
              <ul className="flex justify-end items-center gap-4 mt-3">
                <li>
                  <a href="#" className="facebook text-white" target="_blank" rel="noreferrer" aria-label="facebook">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.128 22 16.991 22 12z" /></svg>
                  </a>
                </li>
                <li>
                  <a href="#" className="twitter text-white" target="_blank" rel="noreferrer" aria-label="twitter">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-7s1.08-7-2-11z" /></svg>
                  </a>
                </li>
                <li>
                  <a href="#" className="linkedin text-white" target="_blank" rel="noreferrer" aria-label="linkedin">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></svg>
                  </a>
                </li>
                <li>
                  <a href="#" className="instagram text-white" target="_blank" rel="noreferrer" aria-label="instagram">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3.2" /><path d="M16.8 2H7.2A5.2 5.2 0 002 7.2v9.6A5.2 5.2 0 007.2 22h9.6A5.2 5.2 0 0022 16.8V7.2A5.2 5.2 0 0016.8 2zm3.2 14.8a3.2 3.2 0 01-3.2 3.2H7.2a3.2 3.2 0 01-3.2-3.2V7.2a3.2 3.2 0 013.2-3.2h9.6a3.2 3.2 0 013.2 3.2v9.6z" /></svg>
                  </a>
                </li>
                <li>
                  <a href="#" className="youtube text-white" target="_blank" rel="noreferrer" aria-label="youtube">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M21.8 8.001a2.8 2.8 0 00-1.97-1.98C18.2 5.6 12 5.6 12 5.6s-6.2 0-7.8.42A2.8 2.8 0 002.2 8.001C1.8 9.6 1.8 12 1.8 12s0 2.4.42 3.999a2.8 2.8 0 001.98 1.98C5.8 18.4 12 18.4 12 18.4s6.2 0 7.8-.421a2.8 2.8 0 001.98-1.98C22.2 14.4 22.2 12 22.2 12s0-2.4-.4-3.999zM10.8 15.2V8.8l6.4 3.2-6.4 3.2z" /></svg>
                  </a>
                </li>
              </ul>
            </div>
            <div className="footer-about mt-4 text-right text-white">
              <p>Copyright @ 2023 Social Shipping. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
