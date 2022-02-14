import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { FunctionComponent } from "react";
import { PizzaModel } from "../../../api/models";

const PizzaCard: FunctionComponent<PizzaModel> = ({ id, name, photo, description, price }) => {

    const openModel = (id: number) => {
        console.log(id);
    }

    return (
        <Card sx={{ maxWidth: 300, margin: "10px 10px 20px" }} onClick={() => openModel(id)}>
            <CardActionArea sx={{ height: 490 }}>
                <CardMedia
                    component="img"
                    height="300"
                    image={photo}
                    alt="pizza"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions sx={{ justifyContent: "space-between", marginLeft: 2 }}>
                <Typography variant="h5" gutterBottom component="div">
                    {price}
                </Typography>
                <Button size="small" color="warning">
                    Добавить
                </Button>
            </CardActions>
        </Card>
    );
}

export default PizzaCard;