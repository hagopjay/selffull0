import { GraphData, GraphNode, GraphLink } from '../types/graph';

export function convertToGraphFormat(jsonData: any): GraphData {
  const nodes: GraphNode[] = [];
  const links: GraphLink[] = [];

  // Add root node
  nodes.push({
    id: 'root',
    name: 'Self',
    group: 'root',
    value: 20
  });

  // Process the JSON data
  Object.entries(jsonData).forEach(([key, value]: [string, any]) => {
    if (typeof value === 'object' && value !== null) {
      // Add category node
      const categoryId = `category_${key}`;
      nodes.push({
        id: categoryId,
        name: key,
        group: 'category',
        value: 15
      });

      // Link to root
      links.push({
        source: 'root',
        target: categoryId,
        value: 2
      });

      // Process nested properties
      Object.entries(value).forEach(([subKey, subValue]: [string, any]) => {
        if (typeof subValue === 'object' && subValue !== null) {
          const leafId = `${categoryId}_${subKey}`;
          nodes.push({
            id: leafId,
            name: subKey,
            group: 'leaf',
            value: 10,
            rating: typeof subValue.Rating === 'string' ? subValue.Rating : undefined
          });

          links.push({
            source: categoryId,
            target: leafId,
            value: 1
          });
        }
      });
    }
  });

  return { nodes, links };
}