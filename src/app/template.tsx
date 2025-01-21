import { SWRprovider } from '@/components';

export default function Template({ children }: { children: React.ReactNode }) {
    return (
        <SWRprovider>
            <div className="mx-auto mt-6 w-[70%]">{children}</div>
        </SWRprovider>
    );
}
