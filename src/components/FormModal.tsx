import { MdClose } from 'react-icons/md';
import { useState } from 'react';
import type { Song } from '../types';

type FormModalProps = {
    setModalActive: React.Dispatch<React.SetStateAction<boolean>>;
    songList: Song[];
    setSongList: React.Dispatch<React.SetStateAction<Song[]>>;
    songToEdit: Song;
    setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
    editMode: boolean;
};
const initialNewEntryState = { id: 0, nombre: '', artista: '', año: '' };

export default function FormModal({
    setModalActive,
    songList,
    setSongList,
    songToEdit,
    editMode,
    setEditMode,
}: FormModalProps) {
    const [newEntry, setNewEntry] = useState(
        editMode ? songToEdit : initialNewEntryState
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewEntry({
            ...newEntry,
            [e.target.name]: e.target.value,
        });
    };

    const addToList = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        let newId = Date.now();
        let updatedNewEntry = { ...newEntry, id: newId };
        setSongList([...songList, updatedNewEntry]);
        setNewEntry(initialNewEntryState);
        setModalActive(false);
    };

    const updateSong = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setSongList(
            songList.map((song) => {
                if (song.id === newEntry.id) {
                    return {
                        ...song,
                        nombre: newEntry.nombre,
                        artista: newEntry.artista,
                        año: newEntry.año,
                    };
                }
                return song;
            })
        );
        setEditMode(false);
        setNewEntry(initialNewEntryState);
        setModalActive(false);
    };

    return (
        <div className='fixed bg-modal w-full h-full flex items-center justify-center'>
            <form
                className='relative min-w-96 bg-slate-100 shadow-xl rounded-xl'
                autoComplete='off'
            >
                <button
                    className='absolute top-2 right-2 cursor-pointer p-2 hover:bg-slate-200 rounded-lg'
                    onClick={(e) => {
                        e.preventDefault();
                        setEditMode(false);
                        setNewEntry(initialNewEntryState);
                        setModalActive(false);
                    }}
                >
                    <MdClose />
                </button>
                <div className='flex flex-col p-5'>
                    <label className='text-left font-semibold px-2' htmlFor=''>
                        Canción
                    </label>
                    <input
                        className='outline-none bg-slate-50 shadow-xl p-3 rounded-lg my-3'
                        type='text'
                        name='nombre'
                        value={newEntry.nombre}
                        onChange={handleChange}
                    />
                    <label className='text-left font-semibold px-2' htmlFor=''>
                        Artista
                    </label>
                    <input
                        className='outline-none bg-slate-50 shadow-xl p-3 rounded-lg my-3'
                        type='text'
                        name='artista'
                        value={newEntry.artista}
                        onChange={handleChange}
                    />
                    <label className='text-left font-semibold px-2' htmlFor=''>
                        Año
                    </label>
                    <input
                        className='outline-none bg-slate-50 shadow-xl p-3 rounded-lg my-3'
                        type='text'
                        name='año'
                        value={newEntry.año}
                        onChange={handleChange}
                    />
                    {editMode ? (
                        <button
                            className='bg-teal-500 p-3 rounded-lg shadow-xl mt-5 cursor-pointer font-bold'
                            onClick={(e) => updateSong(e)}
                        >
                            Guardar
                        </button>
                    ) : (
                        <button
                            className='bg-teal-500 p-3 rounded-lg shadow-xl mt-5 cursor-pointer font-bold'
                            onClick={(e) => addToList(e)}
                        >
                            Agregar
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}
