import {Checkpoint} from "@/types/intefaces";
import type {CheckpointCoordinates} from "@/types/intefaces";

type Graph = {
    [key: string]: {
        [key: string]: number;
    };
};

// Calculate the distance between two checkpoints
export const calculateDistance = (coord1: CheckpointCoordinates, coord2: CheckpointCoordinates): number => {
    const dx = coord1.x - coord2.x;
    const dy = coord1.y - coord2.y;
    return Math.sqrt(dx * dx + dy * dy);
}

//Find the shortest path between two checkpoints
export const findShortestPath = (graph: Graph, start: Checkpoint, end: Checkpoint): Checkpoint[] | null => {
    const distances: { [key: string]: number } = {};
    const previousNodes: { [key: string]: Checkpoint | null } = {};
    const nodes: Checkpoint[] = Object.values(Checkpoint);

    for (const node of nodes) {
        distances[node] = node === start ? 0 : Infinity;
        previousNodes[node] = null;
    }

    while (nodes.length) {
        const closestNode = nodes.reduce((minNode, node) =>
            distances[node] < distances[minNode] ? node : minNode
        );

        if (closestNode === end) {
            const path: Checkpoint[] = [];
            let currentNode: Checkpoint = end;
            while (currentNode !== start) {
                path.unshift(currentNode);
                currentNode = previousNodes[currentNode]!;
            }
            path.unshift(start);
            path.unshift(Checkpoint.Unknown);

            return path;
        }

        nodes.splice(nodes.indexOf(closestNode), 1);

        for (const neighbor in graph[closestNode]) {
            const distance = distances[closestNode] + graph[closestNode][neighbor];
            if (distance < distances[neighbor]) {
                distances[neighbor] = distance;
                previousNodes[neighbor] = closestNode;
            }
        }
    }

    return null;
}