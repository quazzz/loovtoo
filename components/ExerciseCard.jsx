import Image from "next/image";
export default function ExerciseCard({ workout, onPlusClick, onViewDetailsClick }) {
  const name0 = workout.name;
  const gifurl0 = workout.gifUrl;
  const bodypart = workout.bodyPart
  const target0 = workout.target;
  const equipment0 = workout.equipment;
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const name = capitalizeFirstLetter(name0);

  const equipment = capitalizeFirstLetter(equipment0);
  return (
    <div className="max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl rounded overflow-hidden shadow-lg bg-white p-4 m-4 text-center">
  <h2 className="text-xl font-bold mb-2 text-gray-800">{name}</h2>
  <Image
    unoptimized={true}
    className="mx-auto"
    src={gifurl0}
    width={100}
    height={100}
    alt="Gif of workout"
  />
  <p className="text-gray-800 text-lg mb-2">Bodypart: {bodypart}</p>
  <p className="text-gray-700 text-base mb-4">Target: {target0}</p>
  <p className="text-sm text-gray-500">Equipment: {equipment}</p>
  <div className="mt-4">
    <button
      onClick={() => onViewDetailsClick(workout)}
      className="transition-all bg-black hover:bg-gray-900 text-white font-bold py-2 px-4 rounded"
    >
      View Details
    </button>
    <button
      type="button"
      onClick={onPlusClick}
      className="transition-all bg-black hover:bg-gray-900 text-white font-bold py-2 px-4 rounded-full ml-3"
    >
      +
    </button>
  </div>
</div>

  );
}
