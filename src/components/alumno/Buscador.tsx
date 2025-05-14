interface Props {
    onSubmit: (rut: string) => void;
}

export const Buscador = ({ onSubmit }: Props) => {

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const rut = formData.get('rut') as string;
        onSubmit(rut);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col mt-8 mb-20">
            <h1 className="text-gray-700 font-medium">Buscador por rut</h1>
            <div className="flex space-x-2 flex-col md:flex-row">
                <label htmlFor="rut" className="w-full">
                    <input
                        id="rut"
                        name="rut"
                        type="text"
                        className=" w-full border-2 border-primary p-2 bg-primary focus:outline-none focus:shadow-lg transition-shadow duration-300"
                        placeholder="Buscar por rut..."
                    />
                </label>
                <button
                    type="submit"
                    className=" md:w-44 bg-white text-gray-700 font-medium p-2 md:ml-2 mt-4 md:mt-0 shadow-primary hover:shadow-lg transition-shadow duration-300 "
                >
                    Buscar
                </button>
            </div>
        </form>
    )
}