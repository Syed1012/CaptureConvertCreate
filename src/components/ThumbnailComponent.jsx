// ./components/ThumbnailComponent.jsx

import React from "react";
import { useLocation } from "react-router-dom";
import MediaCard from "./../Layout/MediaCard";

const ThumbnailComponent = () => {
  const location = useLocation();
  const cloudinaryUrl = location.state?.cloudinaryUrl || "";

  return (
    <>
      <MediaCard imageUrl={cloudinaryUrl} />;
    </>
  );
};

export default ThumbnailComponent;
