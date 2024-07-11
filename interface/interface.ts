import { Icons } from "next/dist/lib/metadata/types/metadata-types";
import { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";
import { Twitter } from "next/dist/lib/metadata/types/twitter-types";

export type general = {
    id: number;
    name: string;
    description: string;
    image: string;
    price: number;
}

export type Metadata = {
    title: string;
    description: string;
    icons?: Icons[];
    openGraph?: OpenGraph;
    twitter?: Twitter;
}