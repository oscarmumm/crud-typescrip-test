import type { Song } from '../types';

type TableRowProps = {
    song: Song;
    deleteFromList: (id: Song['id']) => void;
    openModalToEdit: (song: Song) => void;
};

export default function TableRow({
    song,
    deleteFromList,
    openModalToEdit,
}: TableRowProps) {
    return (
        <tr className='border-t-2 border-slate-300'>
            <td className='p-5'>{song.nombre}</td>
            <td className='p-5'>{song.artista}</td>     
            <td className='p-5'>{song.año}</td>
            <td className='space-x-2'>
                <button
                    className='p-3 font-bold rounded-lg shadow-lg cursor-pointer text-white bg-yellow-400 hover:bg-yellow-500'
                    onClick={() => openModalToEdit(song)}
                >
                    Editar
                </button>
                <button
                    className='p-3 font-bold rounded-lg shadow-lg cursor-pointer text-white bg-red-500 hover:bg-red-600'
                    onClick={() => deleteFromList(song.id)}
                >
                    Borrar
                </button>
            </td>
        </tr>
    );
}
