from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    treasury_growth_rate: float = 0.01

    class Config:
        env_file = ".env"

settings = Settings()
