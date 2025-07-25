export { };
// https://bobbyhadz.com/blog/typescript-make-types-global#declare-global-types-in-typescript

declare global {
    interface ITrackTop {
        _id: string,
        title: string,
        description: string,
        category: string,
        imgUrl: string,
        trackUrl: string,
        countLike: number,
        countPlay: number,
        uploader: {
            _id: string,
            email: string,
            name: string,
            role: string,
            type: string,
        }
        isDeleted: boolean,
        createdAt: string,
        updatedAt: string,
    }
    interface IRequest {
        url: string;
        method: string;
        body?: { [key: string]: any };
        queryParams?: any;
        useCredentials?: boolean;
        headers?: any;
        nextOption?: any;
    }

    interface IBackendRes<T> {
        error?: string | string[];
        message: string;
        statusCode: number | string;
        data?: T;
    }

    interface IModelPaginate<T> {
        meta: {
            current: number;
            pageSize: number;
            pages: number;
            total: number;
        },
        result: T[]
    }

    interface IShareTrack extends ITrackTop {
        isPlaying: boolean;
    }

    interface ITrackContext {
        currentTrack: IShareTrack;
        setCurrentTrack: (v: IShareTrack) => void;
    }

    interface ITrackComment {
        _id: string;
        content: string;
        moment: number;
        user: {
            _id: string;
            email: string;
            name: string;
            role: string;
            type: string
        },
        track: {
            _id: string;
            title: string;
            description: string;
            trackUrl: string
        },
        isDeleted: boolean;
        createdAt: string;
        updatedAt: string;
    }

    interface ITrackLike {
        _id: string;
        title: string;
        description: string;
        imgUrl: string;
        trackUrl: string;
        countLike: number;
        countPlay: number;
        createdAt: string;
        updatedAt: string;
    }

    interface IPlaylist {
        
    }
}
