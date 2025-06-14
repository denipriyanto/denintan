import "./tiles.css";

const images = [
    "denintan1.jpg",
    "denintan2.jpg",
    "denintan3.jpg",
    "denintan4.jpg",
    "denintan5.jpg",
    "denintan6.jpg",
    "denintan7.jpg",
    "denintan8.jpg",
    "denintan9.jpg",
    "denintan10.jpg",
    "denintan11.jpg",
    "denintan12.jpg",
    "denintan13.jpg",
    "denintan14.jpg",
    "denintan15.jpg",
    "denintan16.jpg",
    "denintan17.jpg",
    "denintan18.jpg",
    "denintan19.jpg",
    "denintan20.jpg",
    "denintan21.jpg",
    "denintan22.jpg",
    "denintan23.jpg",
    "denintan24.jpg",
];
export default function TilesGallery() {
    return (
        // <div className="tiles">
        //     <div className="tiles__line">
        //         {[...images, ...images].map((src, index) => (
        //             <div
        //                 key={index}
        //                 className={`tiles__line-img ${
        //                     index % images.length === 0
        //                         ? "tiles__line-img--large"
        //                         : ""
        //                 }`}
        //                 style={{
        //                     backgroundImage: `url(${src})`,
        //                 }}
        //             ></div>
        //         ))}
        //     </div>
        //     <div className="tiles__line">
        //         {[...images, ...images].map((src, index) => (
        //             <div
        //                 key={index}
        //                 className={`tiles__line-img ${
        //                     index % images.length === 0
        //                         ? "tiles__line-img--large"
        //                         : ""
        //                 }`}
        //                 style={{
        //                     backgroundImage: `url(${src})`,
        //                 }}
        //             ></div>
        //         ))}
        //     </div>
        //     <div className="tiles__line">
        //         {[...images, ...images].map((src, index) => (
        //             <div
        //                 key={index}
        //                 className={`tiles__line-img ${
        //                     index % images.length === 0
        //                         ? "tiles__line-img--large"
        //                         : ""
        //                 }`}
        //                 style={{
        //                     backgroundImage: `url(${src})`,
        //                 }}
        //             ></div>
        //         ))}
        //     </div>
        // </div>
        <div className="tiles">
            {[0, 1, 2].map((lineIndex) => (
                <div key={lineIndex} className="tiles__line">
                    {images
                        .slice(lineIndex * 8, lineIndex * 8 + 8)
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
