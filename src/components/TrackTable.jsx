import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table';

export default function TrackTable({ tracks, onSelectTrack, selectedTrackId }) {
  const columns = useMemo(() => [
    { header: 'Title', accessorKey: 'title' },
    { header: 'Artist', accessorKey: 'artist' },
    { header: 'Genre', accessorKey: 'genre' },
    { header: 'Rating/BPM', accessorKey: 'ratingBpm' },
    { header: 'Record Label', accessorKey: 'recordLabel' },
    { header: 'Role', accessorKey: 'userRole' },
  ], []);

  const table = useReactTable({
    data: tracks,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 3 } } // Meets requirement: 3-5 rows
  });

  return (
    <div className="bg-slate-800 text-white p-6 rounded-xl shadow-lg border border-slate-700 space-y-4">
      <h2 className="text-xl font-bold text-green-400">Track Registry</h2>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-900 border-b border-slate-700 text-slate-300">
            {table.getHeaderGroups().map(hg => (
              <tr key={hg.id}>
                {hg.headers.map(header => (
                  <th key={header.id} className="p-3">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length === 0 ? (
              <tr><td colSpan="6" className="p-4 text-center text-slate-400">No tracks added yet.</td></tr>
            ) : (
              table.getRowModel().rows.map(row => (
                <tr 
                  key={row.id} 
                  onClick={() => onSelectTrack(row.original)}
                  className={`border-b border-slate-700/50 cursor-pointer hover:bg-slate-700/50 transition ${
                    selectedTrackId === row.original.id ? 'bg-green-950/40 border-l-4 border-l-green-500' : ''
                  }`}
                >
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className="p-3">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between pt-2">
        <span className="text-xs text-slate-400">
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount() || 1}
        </span>
        <div className="space-x-2">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-3 py-1 text-xs bg-slate-700 hover:bg-slate-600 disabled:opacity-50 rounded"
          >
            Previous
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-3 py-1 text-xs bg-slate-700 hover:bg-slate-600 disabled:opacity-50 rounded"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}