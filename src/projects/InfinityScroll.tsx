import axios, { AxiosRequestConfig } from "axios"
import { useCallback, useEffect, useState } from "react"
// import { useRef } from "react"
import Loader from "../components/Loader"

interface ImgaeData {
    id: number,
    author: string,
    width: number,
    height: number,
    url: string,
    download_url: string
}

export default function InfinityScroll() {
    const [items, setItems] = useState<ImgaeData[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [page, setPage] = useState(1)
    const [nextPageLoading, setNextPageLoading] = useState(false)
    // const throttleTimer = useRef<number | null>(null);

    const header: AxiosRequestConfig = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    const fetchImages = async (page: number) => {
        const url = `https://picsum.photos/v2/list?page=${page}&limit=10`
        setNextPageLoading(true)
        try {
            const imageResponse = await axios.get(url, header)
            // setItems(imageResponse.data)
            setItems(state => [...state, ...imageResponse.data])
        } catch (error) {
            console.log(error)
        } finally {
            setNextPageLoading(false)
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchImages(page)
    }, [page])

    const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
        const { scrollTop, clientHeight, scrollHeight } = e.currentTarget
        if (!nextPageLoading && scrollTop + clientHeight >= scrollHeight - 400) {
            setPage(page + 1);
        }
    }, [nextPageLoading]);

    return (
        <div onScroll={(e) => !nextPageLoading && handleScroll(e)} style={{ overflowY: "auto", scrollBehavior: "smooth", maxHeight: "92vh" }}>
            <h1 className="text-center text-4xl">infinity Scroll</h1>
            {/* {loading && <Loader />} */}
            {!loading && <Images images={items} />}
            {page > 1 && nextPageLoading && <Loader />}
            {page > 1 && !nextPageLoading && null}
        </div>
    )
}

interface ImagesProps {
    images: ImgaeData[]
}

function Images({ images }: ImagesProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {images.map(image => (
                <ImageCard key={image.id} image={image} />
            ))}
        </div>
    )
}

interface ImageCardProps {
    image: ImgaeData
}

function ImageCard({ image }: ImageCardProps) {
    return <div >
        <img
            loading="lazy"
            className="w-full h-80 object-cover rounded-lg shadow-md"
            src={image.download_url}
            alt={image.author}
            width={400}
            height={400}
        />
    </div>
}