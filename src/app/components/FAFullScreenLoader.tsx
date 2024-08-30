
import FALoader from './FALoader';
import FABackDrop from './FABackDrop';

export default function FAFullScreenLoader({ open }: { open: boolean }) {
    const backdropStyle = {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 1000,
    };
    return (
        <div>
            <FABackDrop show={open}>
                <FALoader />
            </FABackDrop>
        </div>
    );
}