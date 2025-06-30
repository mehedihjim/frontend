const Td = ({ content, className }: { content: any; className?: string }) => {
  return (
    <td className={`text-dark  border-l-0 border-r-0 border-t-0 p-3 px-6 text-left align-middle text-sm font-medium ${className}`}>
      {content}
    </td>
  );
};

export default Td;
