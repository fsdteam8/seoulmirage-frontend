import About_Section from "./_componets/About_Section";

const page = async ({}: { params: { lang: string } }) => {
  return (
    <div>
      <About_Section />
    </div>
  );
};

export default page;
