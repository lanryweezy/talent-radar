import pytest
from services.ai_service import AIService

@pytest.fixture
def ai_service():
    return AIService()

def test_determine_archetype_supernova(ai_service):
    # Supernova requires velocity > 0.8 and popularity >= 60
    artist_data = {
        "velocity": 0.9,
        "popularity": 65,
        "genres": ["pop"]
    }
    archetype = ai_service._determine_archetype_key(artist_data)
    assert archetype == "Supernova"

def test_determine_archetype_vocal_powerhouse(ai_service):
    artist_data = {
        "velocity": 0.2,
        "popularity": 50,
        "genres": ["soul", "r&b"]
    }
    archetype = ai_service._determine_archetype_key(artist_data)
    assert archetype in ["Emotional Storyteller", "Vocal Powerhouse"]

def test_calculate_breakout_score(ai_service):
    artist_data = {
        "velocity": 0.08, # 0.08 * 1000 = 80 velocity score
        "popularity": 70,
        "engagement_score": 85,
        "virality_score": 90,
        "consistency_score": 75,
        "cross_platform_score": 80
    }

    # Expected: (0.40 * 80) + (0.25 * 85) + (0.15 * 90) + (0.10 * 75) + (0.10 * 80)
    # 32 + 21.25 + 13.5 + 7.5 + 8 = 82.25
    score = ai_service._calculate_breakout_score(artist_data)
    assert score == 82.2

def test_calculate_breakout_score_defaults(ai_service):
    # Test with minimal data to ensure defaults don't crash and generate a valid score
    artist_data = {"popularity": 50}
    score = ai_service._calculate_breakout_score(artist_data)
    assert 0 <= score <= 100

def test_analyze_audience_demographics(ai_service):
    artist_data = {"genres": ["drill", "hip hop"]}
    demographics = ai_service.analyze_audience_demographics(artist_data)

    assert demographics["primary_age_group"] == "16-24"
    assert demographics["gender_distribution"]["male"] == 65
    assert demographics["gender_distribution"]["female"] == 35

def test_suggest_collaborations(ai_service):
    collabs = ai_service.suggest_collaborations({}, "Supernova")
    assert "Global superstar (A-List)" in collabs
    assert "High-profile fashion brand (Sync)" in collabs

def test_generate_campaign_strategy(ai_service):
    strategy = ai_service.generate_campaign_strategy({}, "Supernova", 90.0)
    assert strategy["primary_focus"] == "Aggressive Global Scaling"
    assert strategy["recommended_budget_split"]["TikTok/Short Form"] == 40

@pytest.mark.asyncio
async def test_analyze_artist(ai_service):
    artist_data = {
        "velocity": 0.9,
        "popularity": 80,
        "genres": ["pop"]
    }

    analysis = await ai_service.analyze_artist(artist_data)

    assert analysis["archetype"] == "Supernova"
    assert "breakout_score" in analysis
    assert "audience_demographics" in analysis
    assert "suggested_collaborations" in analysis
    assert "campaign_strategy" in analysis
    assert "strategic_intelligence" in analysis
