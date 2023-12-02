const UseSectionTitle = (title1, title2) => {
  const sectionValue = (
    <>
      <div className="border-y-4 w-1/2 py-4 border-orange-600 my-10 justify-center mx-auto flex gap-x-2">
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
