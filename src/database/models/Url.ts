import {
  Table,
  Model,
  DataType,
  Column,
  CreatedAt,
  UpdatedAt,
  PrimaryKey,
  AllowNull,
  AutoIncrement,
} from 'sequelize-typescript';

@Table
export class Url extends Model {
  @AutoIncrement
  @AllowNull(false)
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: number;

  @Column(DataType.STRING)
  code: string;

  @Column(DataType.STRING(1234))
  long_url: string;

  @Column(DataType.STRING)
  short_url: string;

  @CreatedAt
  @Column(DataType.DATE)
  created_at: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  updated_at: Date;
}
