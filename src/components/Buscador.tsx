export const Buscador = () => {
    return (
        <form className="flex flex-col mt-8 mb-20">
            <h1 className="text-gray-700 font-medium">Buscador por rut</h1>
            <div className="flex space-x-2">
                <label htmlFor="" className="w-full">
                    <input
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