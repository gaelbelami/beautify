export type User = {
    id: string;
    name: string;
    email: string;
}
export const fetchUser = async (userId: string): Promise<User> => {
const response  = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
console.log("Hello")
if(!response.ok) {
    throw new Error("Failed to fetch user");
}

const data = await response.json();

console.log("Data", data)
return {
    id: data.id,
    name: data.name,
    email: data.email,
};
}