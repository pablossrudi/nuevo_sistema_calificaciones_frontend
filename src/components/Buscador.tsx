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
            <div className="flex space-x-2">
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
                    className="w-44 bg-white text-gray-700 font-medium p-2 ml-2 shadow-primary hover:shadow-lg transition-shadow duration-300 "
                >
                    Buscar
                </button>
            </div>
        </form>
    )
}