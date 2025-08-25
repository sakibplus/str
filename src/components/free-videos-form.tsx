import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export function FreeVideosForm() {
    return (
        <section className="py-12 bg-gray-100">
            <div className="container mx-auto flex justify-center">
                <Card className="w-full max-w-lg shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-center text-2xl font-bold text-primary">
                            লাইভ কোর্সের কিছু ভিডিও দেখুন ফ্রি!
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form className="flex gap-2">
                             <div className="flex-none w-24">
                                <Input type="text" value="+88" readOnly className="bg-gray-200 text-center"/>
                             </div>
                            <Input type="tel" placeholder="আপনার মোবাইল নম্বর দিন" className="flex-grow"/>
                            <Button type="submit" className="bg-accent hover:bg-accent/90">
                                সাবমিট
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}
