import React, {useState, useEffect} from "react";

export default function ImageComponent({filename}) {
    const [imageUrl, setImageUrl] = useState(null);

    // Replace 'your-image-file-name' with the actual image filename you want to render
    const imageFileName = 'your-image-file-name';

    // Fetch the image URL from the server
    useEffect(() => {
        fetch(`http://localhost:3000/uploads/${filename}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Image not found');
                }
                return response.blob();
            })
            .then((blob) => {
                setImageUrl(URL.createObjectURL(blob));
            })
            .catch((error) => {
                console.error('Error fetching image:', error);
            });
    }, [imageFileName]);

    return (
        <div>
            {imageUrl ? (
                <img src={imageUrl} alt="Uploaded Image" />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}