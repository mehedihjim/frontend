const Th = ({ content }: { content: any }) => {
  return (
    <th className="bg-slate-200 px-4 py-2 text-center align-middle text-xs font-semibold text-black dark:bg-slate-800 dark:text-white sm:text-left sm:text-sm">
      {content}
    </th>
  );
};

export default Th;
//min-w-[220px]
