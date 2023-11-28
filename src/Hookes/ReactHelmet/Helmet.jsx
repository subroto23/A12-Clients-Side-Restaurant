import { Helmet } from "react-helmet-async";

const HelmetHookes = ({ title }) => {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{title}</title>
      <link
        rel="canonical"
        href="https://hostel-management-delta.vercel.app/"
      />
    </Helmet>
  );
};

export default HelmetHookes;
