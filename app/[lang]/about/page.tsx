import { getDictionary } from "@/dictionaries/dictionaries";
import About_Section from "./_componets/About_Section";

const page = async ({ params }: { params: { lang: string } }) => {
  const { lang } = params;

  const dict = await getDictionary(lang as "en" | "ar");
  console.log(dict)

  return (
    <div>
      <About_Section dict={dict} />
    </div>
  );
};

export default page;
