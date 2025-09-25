import React, { useEffect, useState } from "react";

const BLOG_ID = "7264237435288083204"; // your Blogger blog ID
const API_KEY = "AIzaSyAX-NMomRRbocPpxQDMtoC-2gnLJRH9YHs"; // your Google API key

const Blog = () => {
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchAllPosts = async () => {
        let allPosts: any[] = [];
        let pageToken: string | undefined;

        try {
            do {
                let url = `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts?key=${API_KEY}&maxResults=50`;
                if (pageToken) {
                    url += `&pageToken=${pageToken}`;
                }

                const res = await fetch(url);
                const data = await res.json();

                allPosts = [...allPosts, ...(data.items || [])];
                pageToken = data.nextPageToken; // check if more pages
            } while (pageToken);

            setPosts(allPosts);
        } catch (err) {
            console.error("Error fetching blogs:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllPosts();
    }, []);

    if (loading) return <div>Loading blogs...</div>;

    return (
        <div>
            <h2>All Blogs:</h2>
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <a href={post.url} target="_blank" rel="noopener noreferrer">
                            {post.title || 'Untitled Post'}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Blog;
