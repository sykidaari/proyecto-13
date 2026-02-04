const GenresBadgesList = ({ genres }) => {
  return (
    <ul className='flex gap-1'>
      {genres?.map((g) => (
        <li key={g.id} className='font-semibold badge badge-sm'>
          {g.name}
        </li>
      ))}
    </ul>
  );
};

export default GenresBadgesList;
