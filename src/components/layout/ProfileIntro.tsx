// src/components/ProfileIntro.tsx
import React from 'react';

interface ProfileIntroProps {
  profileImageUrl: string;
  introText: string;
}

const ProfileIntro: React.FC<ProfileIntroProps> = React.memo(({ profileImageUrl, introText }) => {
  return (
    <section className="flex items-center space-x-4 p-4">
      <img 
        src={profileImageUrl} 
        alt="Profile" 
        className="w-16 h-16 rounded-full object-cover"
      />
      <div>
        <p className="text-gray-800 font-medium">{introText}</p>
      </div>
      {/* (제외) 팔로워/팔로잉 */}
    </section>
  );
});

export default ProfileIntro;
