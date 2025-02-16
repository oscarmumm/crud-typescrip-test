import { useState } from 'react';
import { db } from './data/db';
import TableRow from './components/TableRow';
import FormModal from './components/FormModal';
import { Song } from './types';

function App() {
    const [songList, setSongList] = useState(db);
    const [modalActive, setModalActive] = useState(false);
    const [songToEdit, setSongToEdit] = useState<Song>({id: 0, nombre: '', artista: '', año: ''})
    const [editMode, setEditMode] = useState(false)

    const deleteFromList = (id: Song['id']) => {
        setSongList(songList.filter((song) => song.id !== id));
    };

    const openModalToEdit = (song: Song) => {
        setSongToEdit(song)
        setEditMode(true)
        setModalActive(true)
    };

    return (
        <div className='w-screen h-screen bg-slate-200 mx-auto text-center flex flex-col items-center space-y-5 overflow-auto'>
            <header>
                <h1 className='text-3xl font-black p-5'>
                    CRUD - TypeScript - Test
                </h1>
            </header>
            <main className='space-y-5'>
                <p>
                    En este ejemplo completa los campos con información de
                    canciones de la saga Fallout
                </p>
                <button
                    className='p-3 bg-emerald-600 rounded-lg shadow-xl text-white font-bold cursor-pointer'
                    onClick={() => setModalActive(true)}
                >
                    Agregar Canción
                </button>
                {songList.length > 0 ?
                <table className='rounded-xl overflow-hidden shadow-2xl bg-slate-100'>
                    <thead className='bg-slate-400'>
                        <tr>
                            <th className='p-3 min-w-50'>Canción</th>
                            <th className='p-3 min-w-50'>Artista</th>
                            <th className='p-3 min-w-50'>Año</th>
                            <th className='p-3 min-w-50'>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {songList.map((song) => (
                            <TableRow
                                key={song.id}
                                song={song}
                                deleteFromList={deleteFromList}
                                openModalToEdit={openModalToEdit}
                                />
                            ))}
                    </tbody>
                </table>
                     : <p>No hay canciones en la lista</p>   }
            </main>
            {modalActive && (
                <FormModal
                    setModalActive={setModalActive}
                    setSongList={setSongList}
                    songList={songList}
                    songToEdit={songToEdit}
                    editMode={editMode}
                    setEditMode={setEditMode}
                />
            )}
        </div>
    );
}

export default App;
