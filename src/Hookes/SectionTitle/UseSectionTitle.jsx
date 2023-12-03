const UseSectionTitle = (title1, title2, style) => {
  const sectionValue = (
    <>
      <div
        className={`border-y-4 w-1/2 md:py-10 py-4 ${style} border-orange-600 my-10 justify-center mx-auto flex gap-x-2`}
      >
        <h1 className="md:text-2xl text-xl font-semibold text-center">
          {title1}
        </h1>
        <h1 className="md:text-2xl text-xl font-semibold text-center text-orange-600">
          {title2}
        </h1>
      </div>
    </>
  );
  return sectionValue;
};

export default UseSectionTitle;
