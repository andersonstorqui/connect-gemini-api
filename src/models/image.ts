import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface ImageAttributes {
  id: number;
  title: string;
  url: string;
  description?: string;
}

interface ImageCreationAttributes extends Optional<ImageAttributes, 'id'> {}

class Image extends Model<ImageAttributes, ImageCreationAttributes> implements ImageAttributes {
  public id!: number;
  public title!: string;
  public url!: string;
  public description!: string | undefined;
}

Image.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: 'Image',
  }
);

export default Image;
