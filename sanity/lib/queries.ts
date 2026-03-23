export const heroQuery = `*[_type == "hero"][0]{
  catchCopy,
  mediaType,
  backgroundImage,
  "backgroundVideoUrl": backgroundVideo.asset->url,
  videoPoster,
  ctaText
}`;

export const aboutQuery = `*[_type == "about"][0]{
  salesText,
  careerText,
  images
}`;

export const portfolioQuery = `*[_type == "portfolio"] | order(order asc){
  _id,
  title,
  description,
  images,
  ctaText
}`;

export const catchCarouselQuery = `*[_type == "catchCarousel"][0]{
  catchCopy,
  description,
  carouselImages
}`;

export const featuresQuery = `*[_type == "feature"] | order(order asc){
  _id,
  title,
  description,
  icon
}`;

export const pricingQuery = `*[_type == "pricingPlan"] | order(order asc){
  _id,
  category,
  planName,
  thumbnail,
  overview,
  includes,
  notes
}`;

export const coordinatesQuery = `*[_type == "coordinate"] | order(order asc){
  _id,
  slug,
  description,
  photos
}`;

export const venueQuery = `*[_type == "venue"][0]{
  description,
  photos
}`;

export const flowStepsQuery = `*[_type == "flowStep"] | order(stepNumber asc){
  _id,
  stepNumber,
  title,
  description,
  icon
}`;

export const testimonialsQuery = `*[_type == "testimonial"] | order(order asc){
  _id,
  reviewText,
  personPhoto,
  eventPhoto,
  name,
  company
}`;

export const siteSettingsQuery = `*[_type == "siteSettings"][0]{
  siteName,
  logo,
  logoFooter,
  ogImage,
  contactEmail,
  phone,
  address,
  socialLinks
}`;
