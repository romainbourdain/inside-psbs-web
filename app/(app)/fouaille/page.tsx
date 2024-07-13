import { PageLayout } from "@/components/tailwind/page-layout";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { FouailleChart } from "@/features/fouaille/fouaille-chart";
import type { PageParams } from "@/types/next";

const data = {
  balance: "12.71",
  first_name: "enzo",
  last_name: "bergamini",
  user_name: "zozoLeZozo",
  orders: [
    {
      date: "2023-06-21 09:56:09",
      total_price: "5.00",
      amount: 1,
      product: null,
    },
    {
      date: "2023-06-20 16:46:15",
      total_price: "-6.00",
      amount: 2,
      product: {
        name: "fromage",
        title: "fromage",
        unit_price: "-3",
        color: "#61385c",
      },
    },
    {
      date: "2023-06-20 07:44:01",
      total_price: "-4.80",
      amount: 4,
      product: {
        name: "cocktail12",
        title: "cocktail12",
        unit_price: "-1.2",
        color: "#c2d5ac",
      },
    },
    {
      date: "2023-06-19 06:02:22",
      total_price: "-3.60",
      amount: 3,
      product: {
        name: "cocktail12",
        title: "cocktail12",
        unit_price: "-1.2",
        color: "#c2d5ac",
      },
    },
    {
      date: "2023-06-16 15:05:50",
      total_price: "-4.80",
      amount: 4,
      product: {
        name: "metre",
        title: "metre",
        unit_price: "-1.2",
        color: "#d35b71",
      },
    },
    {
      date: "2023-06-15 05:55:22",
      total_price: "-2.40",
      amount: 2,
      product: {
        name: "metre",
        title: "metre",
        unit_price: "-1.2",
        color: "#d35b71",
      },
    },
    {
      date: "2023-06-15 03:04:53",
      total_price: "-6.60",
      amount: 3,
      product: {
        name: "cookies",
        title: "cookies",
        unit_price: "-2.2",
        color: "#2d3a24",
      },
    },
    {
      date: "2023-06-14 23:54:57",
      total_price: "-6.40",
      amount: 4,
      product: {
        name: "cocktail16",
        title: "cocktail16",
        unit_price: "-1.6",
        color: "#0403ff",
      },
    },
    {
      date: "2023-06-14 01:53:45",
      total_price: "-4.80",
      amount: 3,
      product: {
        name: "cocktail16",
        title: "cocktail16",
        unit_price: "-1.6",
        color: "#0403ff",
      },
    },
    {
      date: "2023-06-13 04:04:22",
      total_price: "-6.00",
      amount: 5,
      product: {
        name: "metre",
        title: "metre",
        unit_price: "-1.2",
        color: "#d35b71",
      },
    },
  ],
};

const getOrdersMoney = () => {
  let money_available = parseInt(data.balance) + 50;

  return data.orders.map((o) => {
    money_available += parseInt(o.total_price);
    return {
      money: money_available,
      date: new Date(o.date).toLocaleDateString("FR-fr", {
        month: "short",
        day: "numeric",
      }),
    };
  });
};

export default async function RoutePage(props: PageParams<{}>) {
  // await getFouailleAction(null);

  const orders = getOrdersMoney();
  return (
    <PageLayout>
      <Typography variant="h2">Fouaille</Typography>
      <Card>
        <CardHeader>
          <CardTitle>{data.balance}</CardTitle>
        </CardHeader>
      </Card>
      <div className="">
        <FouailleChart data={orders} />
      </div>
    </PageLayout>
  );
}
