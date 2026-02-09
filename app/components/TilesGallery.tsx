import "./tiles.css";

const images = [
    "endamawan1.avif",
    "endamawan2.avif",
    "endamawan3.avif",
    "endamawan4.avif",
    "endamawan5.avif",
    "endamawan6.avif",
    "endamawan7.avif",
    "endamawan8.avif",
    "endamawan9.avif",
    "endamawan10.avif",
    "endamawan11.avif",
    "endamawan12.avif",
    "endamawan13.avif",
    "endamawan14.avif",
    "endamawan15.avif",
    "endamawan16.avif",
];
export default function TilesGallery() {
    return (
        <div className="tiles">
            {[0, 1, 2].map((lineIndex) => (
                <div key={lineIndex} className="tiles__line">
                    {images
                        .slice(lineIndex * 4, lineIndex * 4 + 4)
                        .map((src, index) => (
                            <div
                                key={index}
                                className={`tiles__line-img ${
                                    index % 3 === 0
                                        ? "tiles__line-img--large"
                                        : ""
                                }`}
                                style={{
                                    backgroundImage: `url(${src})`,
                                }}
                            ></div>
                        ))}
                </div>
            ))}
        </div>
    );
}
