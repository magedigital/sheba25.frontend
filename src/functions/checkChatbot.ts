export default function checkChatbot(): boolean {
    const search = window.location.search?.slice(1);

    return !!search?.split('&').find((item) => item.split('=')[0] === 'chatbot');
}
