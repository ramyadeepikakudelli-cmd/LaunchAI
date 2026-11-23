import time

def process_async_generation(campaign_id: int, prompt: str):
    """Simulates or runs async generation background task."""
    print(f"[Worker] Starting generation for Campaign #{campaign_id}...")
    time.sleep(1)
    print(f"[Worker] Finished generation for Campaign #{campaign_id}.")
    return True
