export default function randomNumber() {
    const random = (Math.random() * 1000000000000).toFixed(0);
    return random.toString();
}