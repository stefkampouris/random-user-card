"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";
import { User } from "../types/types";
import { Button } from "@/components/ui/button";
import { Loader2, ChevronDown, ChevronUp, Mail, Phone, MapPin, RefreshCw } from "lucide-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMars, faVenus } from '@fortawesome/free-solid-svg-icons';
import { Inter } from 'next/font/google';

const inter = Inter({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const UserCard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const fetchUser = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("https://randomuser.me/api/");
      const data = await response.json();
      setUser(data.results[0]);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const GenderIcon = useMemo(() => {
    const GenderIconComponent = ({ gender }: { gender: string }) => (
      gender.toLowerCase() === 'male' ? (
        <FontAwesomeIcon icon={faMars} className="text-blue-500 w-4 h-4" />
      ) : (
        <FontAwesomeIcon icon={faVenus} className="text-pink-500 w-4 h-4" />
      )
    );
    GenderIconComponent.displayName = 'GenderIcon';
    return GenderIconComponent;
  }, []);

  const handleEmailClick = useCallback(() => {
    if (user) window.location.href = `mailto:${user.email}`;
  }, [user]);

  const handlePhoneClick = useCallback(() => {
    if (user) window.location.href = `tel:${user.phone}`;
  }, [user]);

  const handleMapClick = useCallback(() => {
    if (user) {
      const address = `${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.country}`;
      window.open(`https://www.google.com/maps/search/${encodeURIComponent(address)}`);
    }
  }, [user]);

  return (
    <div className={`flex flex-col items-center w-full p-3 ${inter.className}`}>
      <div className="w-full max-w-[22rem] lg:max-w-[26rem] xl:max-w-[30rem] mx-auto p-4 bg-white shadow-lg rounded-lg hover:shadow-[0_0_15px_rgba(242,124,34,0.3)] transition duration-500 relative">
        {/* Expand/Collapse Button */}
        {user && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="absolute top-4 right-4 p-2 hover:bg-[#f27c22]/10 rounded-full transition-colors"
          >
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        )}

        {user && (
          <>
            <div className="flex flex-col md:flex-row items-center md:space-x-5 mb-4">
              <img
                src={user.picture.large}
                alt={`${user.name.first} ${user.name.last}`}
                className="w-20 h-24 object-cover rounded-xl shadow-lg hover:shadow-[0_0_10px_rgba(242,124,34,0.3)] transition-shadow duration-300 mb-3 md:mb-0"
              />
              <div className="text-center md:text-left w-full pr-8 md:pr-12">
                <h2 className="text-xl lg:text-2xl font-semibold tracking-wide flex items-center justify-center md:justify-start gap-2">
                  <span className="font-semibold whitespace-nowrap">
                    {`${user.name.title}.`}
                  </span>
                  <span className="truncate">
                    {`${user.name.first} ${user.name.last}`}
                  </span>
                </h2>
                <div className="flex items-center justify-center md:justify-start gap-1 text-gray-600 mt-1">
                  <GenderIcon gender={user.gender} />
                  <p className="capitalize text-sm lg:text-base">{user.gender}</p>
                </div>
                <p className="text-gray-600 mt-1 truncate hover:text-clip text-sm lg:text-base">
                  {user.email}
                </p>
              </div>
            </div>

            <div className="text-gray-700 mb-4 text-center md:text-left text-sm lg:text-base">
              <p><strong>Location:</strong> {`${user.location.city}, ${user.location.country}`}</p>
              
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isExpanded ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="mt-2 pl-4 border-l-2 border-[#f27c22]">
                  <p className="text-sm text-gray-600">
                    <strong>Street:</strong> {`${user.location.street.number} ${user.location.street.name}`}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>State:</strong> {user.location.state}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Postcode:</strong> {user.location.postcode}
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Buttons */}
            <div className="flex flex-wrap gap-2 justify-center">
              <Button 
                onClick={handleEmailClick} 
                className="gap-2 text-sm lg:text-base bg-[#f27c22] hover:bg-[#c25d10] text-white"
              >
                <Mail size={18} />
                Email
              </Button>
              <Button 
                onClick={handlePhoneClick} 
                className="gap-2 text-sm lg:text-base bg-[#f27c22] hover:bg-[#c25d10] text-white"
              >
                <Phone size={18} />
                Call
              </Button>
              <Button 
                onClick={handleMapClick} 
                className="gap-2 text-sm lg:text-base bg-[#f27c22] hover:bg-[#c25d10] text-white"
              >
                <MapPin size={18} />
                Map
              </Button>
            </div>
          </>
        )}
      </div>
      
      <Button 
        onClick={fetchUser} 
        variant="outline" 
        className="w-full max-w-[22rem] lg:max-w-[26rem] xl:max-w-[30rem] mt-4 text-base py-3 gap-2 border-[#f27c22] text-[#f27c22] hover:bg-[#f27c22] hover:text-white"
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Loading...
          </>
        ) : (
          <>
            <RefreshCw size={20} />
            Get Another User
          </>
        )}
      </Button>
    </div>
  );
};

export default UserCard;
