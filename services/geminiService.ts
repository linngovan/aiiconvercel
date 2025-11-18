export const embellishTextWithIcons = async (text: string): Promise<string[]> => {
    try {
        const response = await fetch('/api/suggest-icons', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'An unknown error occurred');
        }

        return await response.json();
    } catch (error) {
        console.error("Error suggesting icons:", error);
        throw new Error("Failed to get suggestions from the AI. Please try again.");
    }
};
